import { signIn } from 'next-auth/react'

export const handleGoogleSignIn = async () => {
  try {
    // First try to register with Google
    const registerResponse = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'google',
        email: '', // Will be provided by Google
        name: '', // Will be provided by Google
      }),
    })

    // Whether registration succeeds or fails (user might already exist),
    // proceed with Google sign in
    const result = await signIn('google', {
      callbackUrl: '/dashboard',
    })

    return result
  } catch (error) {
    console.error('Google sign in error:', error)
    throw error
  }
}

export const handleCredentialsSignIn = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result?.ok) {
      throw new Error(result?.error || 'Failed to sign in')
    }

    return result
  } catch (error) {
    console.error('Credentials sign in error:', error)
    throw error
  }
}
