import { signinInput, signupInput } from '@prank_14/common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ msg: 'invalid inputs' })
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    })
    console.log('problem')
    const secret = c.env.JWT_SECRET
    const token = await sign({ id: user.id }, secret)
    return c.text(token)
  } catch (e) {
    c.status(403)
    console.log(e)
    return c.json({ msg: 'error while signing in' })
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ msg: 'invalid inputs' })
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (!user) {
      c.status(403)
      return c.json({ msg: 'User not Found' })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.text(token)
  } catch (e) {
    return c.json({ msg: 'Error' })
  }
})
