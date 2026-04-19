import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'
import { compare } from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Compare password
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return user profile data for the employee dashboard
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        // Employee profile fields
        fullName: user.fullName || user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role || 'employee',
        position: user.position,
        department: user.department,
        employeeId: user.employeeId,
        avatar: user.avatar,
        address: user.address,
        joinedDate: user.joinedDate,
        // Leave balance
        annualLeave: user.annualLeave,
        sickLeave: user.sickLeave,
        personalLeave: user.personalLeave,
        workFromHome: user.workFromHome,
        // Status
        isActive: user.isActive
      },
      isAdmin: user.email === 'hradmin@gmail.com' || user.role === 'admin' || user.role === 'hr'
    })
  } catch (error: any) {
    console.error('Login error:', error)
    const message = process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Internal server error'
    return NextResponse.json({ message }, { status: 500 })
  }
}