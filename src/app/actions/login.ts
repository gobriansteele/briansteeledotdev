'use server'
import { WORK_WITH_ME } from '@/utils'

export async function checkLoginAction(formData: FormData) {
  const loginCode = formData.get('loginCode') as string
  if (!loginCode) return false
  return loginCode === WORK_WITH_ME
}
