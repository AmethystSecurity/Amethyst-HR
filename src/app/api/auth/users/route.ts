import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    // Get all users (exclude password field)
    const users = await User.find({}).select('-password').lean()

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
      }))
    })
  } catch (error: any) {
    console.error('Get users error:', error)
    const message = process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Internal server error'
    return NextResponse.json({ message }, { status: 500 })
  }
}