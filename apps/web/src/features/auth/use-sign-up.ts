import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { SignUpFormData } from './sign-up-schema'

interface SignUpError {
	message: string
	code: string
}

export function useSignUp() {
	return useMutation({
		mutationFn: async (data: SignUpFormData) => {
			await api.post('/auth/sign-up', data)
		},
		onError: (error) => {
			if (axios.isAxiosError<SignUpError>(error)) {
				return error.response?.data
			}
		},
	})
}
