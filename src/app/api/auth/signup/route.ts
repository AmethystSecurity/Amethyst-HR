import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json()

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 409 }
      )
    }

    // Parse name from username (e.g., "john.doe" -> firstName: "john", lastName: "doe")
    const nameParts = username.split(/[._-]/)
    const firstName = nameParts[0] || username
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
    const fullName = username.replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

    // Generate employee ID based on email hash or sequential
    const emailHash = email.split('@')[0].replace(/[^a-z]/g, '')
    const employeeId = `EMP-${emailHash.toUpperCase().slice(0, 3).padEnd(3, '0')}`

    // Determine department from email domain (for demo - in production would be selected)
    const department = getDepartmentFromEmail(email)

    // Determine position based on department
    const position = getPositionFromDepartment(department)

    // Create new user with employee profile fields
    const user = new User({
      email,
      username,
      password,
      // Employee profile
      fullName,
      firstName,
      lastName,
      role: 'employee',
      position,
      department,
      employeeId,
      joinedDate: new Date(),
      // Leave balance (default values from schema)
      annualLeave: 15,
      sickLeave: 10,
      personalLeave: 5,
      workFromHome: 12,
      // Status
      isActive: true
    })
    await user.save()

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        position: user.position,
        department: user.department,
        employeeId: user.employeeId
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to determine department from email
function getDepartmentFromEmail(email: string): string {
  const prefix = (email || '').split('@')[0].toLowerCase()
  
  // Map specific usernames to departments
  const departmentMap: Record<string, string> = {
    'admin': 'Administration',
    'hr': 'Human Resources',
    'hradmin': 'Human Resources',
    'james': 'Engineering',
    'michael': 'Engineering',
    'david': 'Engineering',
    'amanda': 'Engineering',
    'emily': 'Design',
    'robert': 'Design',
    'lisa': 'Marketing',
    'sarah': 'Human Resources',
    'john': 'Sales',
    'jane': 'Sales',
    'tech': 'Engineering',
    'dev': 'Engineering',
    'design': 'Design',
    'support': 'Customer Support',
    'finance': 'Finance',
    'accounting': 'Finance'
  }

  // Check for partial match
  for (const [key, dept] of Object.entries(departmentMap)) {
    if (prefix.includes(key)) {
      return dept
    }
  }

  // Default department based on common patterns
  if (prefix.includes('dev') || prefix.includes('engineer') || prefix.includes('tech')) {
    return 'Engineering'
  }
  if (prefix.includes('design')) {
    return 'Design'
  }
  if (prefix.includes('market')) {
    return 'Marketing'
  }
  if (prefix.includes('sale')) {
    return 'Sales'
  }

  return 'General'
}

// Helper function to determine position from department
function getPositionFromDepartment(department: string): string {
  const positionMap: Record<string, string> = {
    'Engineering': 'Software Engineer',
    'Design': 'UI/UX Designer',
    'Marketing': 'Marketing Specialist',
    'Sales': 'Sales Representative',
    'Human Resources': 'HR Coordinator',
    'Administration': 'Administrative Assistant',
    'Finance': 'Financial Analyst',
    'Customer Support': 'Support Specialist',
    'General': 'Staff Member'
  }

  return positionMap[department] || 'Staff Member'
}