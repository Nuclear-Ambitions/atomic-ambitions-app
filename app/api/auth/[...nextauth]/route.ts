import { handlers } from '@/auth'

// Enhanced handlers with debugging
const { GET: originalGET, POST: originalPOST } = handlers

export const GET = async (request: Request) => {
  try {
    return await originalGET(request as any)
  } catch (error) {
    console.error('🔐 [NEXTAUTH DEBUG] GET error:', error)
    console.error('🔐 [NEXTAUTH DEBUG] GET error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}

export const POST = async (request: Request) => {
  try {
    // Clone the request to read body without consuming it
    const clonedRequest = request.clone()
    const body = await clonedRequest.text()
    const response = await originalPOST(request as any)
    return response
  } catch (error) {
    console.error('🔐 [NEXTAUTH DEBUG] POST error:', error)
    console.error('🔐 [NEXTAUTH DEBUG] POST error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}