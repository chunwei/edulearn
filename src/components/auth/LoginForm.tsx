import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// 使用新的认证 hook
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 使用 Supabase 认证
  const { login } = useSupabaseAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      } else {
        setError(
          'Invalid email or password. For demo, use provided credentials.'
        )
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-600 mt-1">
          Please enter your credentials to continue
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-2 mb-2">
        <p className="text-sm text-gray-600">Demo accounts:</p>
        <div className="grid grid-cols-1 gap-1 text-xs text-gray-500">
          <div>Student: john@example.com</div>
          <div>Instructor: jane@example.com</div>
          <div>Admin: admin@example.com</div>
          <div>Password for all: password</div>
        </div>
      </div>

      <Input
        // label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // fullWidth
        required
      />

      <Input
        // label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // fullWidth
        required
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="size-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={isLoading} className="mt-6">
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}