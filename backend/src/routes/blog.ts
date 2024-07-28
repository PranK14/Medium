import { createPostInput, updatePostInput } from '@prank_14/common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

/**********************MIDDLEWARE*********************** */
blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    c.status(403)
    return c.json({ error: 'Unauthorized Access' })
  }

  const token = authHeader
  const user = await verify(token, c.env.JWT_SECRET)

  if (user) {
    c.set('jwtPayload', user.id)
    await next()
  } else {
    c.status(403)
    return c.json({ msg: 'Unauthorized Access' })
  }
})

/********************************************************** */

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = createPostInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ msg: 'invalid inputs' })
  }
  const userId = c.get('jwtPayload')
  console.log(userId)

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
    return c.json({ post })
  } catch (e) {
    c.status(403)
    return c.json({ msg: 'post cannot be created' })
  }
})

blogRouter.put('/', async (c) => {
  const userId = c.get('jwtPayload')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = updatePostInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ msg: 'invalid inputs' })
  }
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })

  return c.json({ msg: 'post updated successfully' })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return c.json({ blogs })
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return c.json({ post })
  } catch (e) {
    c.status(403)
    return c.json({ error: 'post not found' })
  }
})
