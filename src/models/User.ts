import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  username: string
  password: string
  // Employee profile fields
  fullName?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: string
  position?: string
  department?: string
  employeeId?: string
  avatar?: string
  address?: string
  joinedDate?: Date
  // Leave balance
  annualLeave?: number
  sickLeave?: number
  personalLeave?: number
  workFromHome?: number
  // Status
  isActive?: boolean
  // Timestamps
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // Employee profile fields
  fullName: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'manager', 'hr', 'admin']
  },
  position: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String
  },
  address: {
    type: String,
    trim: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  // Leave balance (days)
  annualLeave: {
    type: Number,
    default: 15
  },
  sickLeave: {
    type: Number,
    default: 10
  },
  personalLeave: {
    type: Number,
    default: 5
  },
  workFromHome: {
    type: Number,
    default: 12
  },
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)