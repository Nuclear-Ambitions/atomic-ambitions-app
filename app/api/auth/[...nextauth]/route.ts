import { handlers } from '@/auth' // Referring to the auth.ts we just created

// Enhanced handlers with debugging
const { GET: originalGET, POST: originalPOST } = handlers

export const GET = async (request: Request) => {
  console.log('🔐 [NEXTAUTH DEBUG] GET request received')
  console.log('🔐 [NEXTAUTH DEBUG] Request URL:', request.url)
  console.log('🔐 [NEXTAUTH DEBUG] Request headers:', Object.fromEntries(request.headers.entries()))

  try {
    const response = await originalGET(request as any)
    console.log('🔐 [NEXTAUTH DEBUG] GET response status:', response.status)
    console.log('🔐 [NEXTAUTH DEBUG] GET response headers:', Object.fromEntries(response.headers.entries()))
    return response
  } catch (error) {
    console.error('🔐 [NEXTAUTH DEBUG] GET error:', error)
    console.error('🔐 [NEXTAUTH DEBUG] GET error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}

export const POST = async (request: Request) => {
  console.log('🔐 [NEXTAUTH DEBUG] POST request received')
  console.log('🔐 [NEXTAUTH DEBUG] Request URL:', request.url)
  console.log('🔐 [NEXTAUTH DEBUG] Request headers:', Object.fromEntries(request.headers.entries()))

  try {
    // Clone the request to read body without consuming it
    const clonedRequest = request.clone()
    const body = await clonedRequest.text()
    console.log('🔐 [NEXTAUTH DEBUG] Request body:', body)

    const response = await originalPOST(request as any)
    console.log('🔐 [NEXTAUTH DEBUG] POST response status:', response.status)
    console.log('🔐 [NEXTAUTH DEBUG] POST response headers:', Object.fromEntries(response.headers.entries()))
    return response
  } catch (error) {
    console.error('🔐 [NEXTAUTH DEBUG] POST error:', error)
    console.error('🔐 [NEXTAUTH DEBUG] POST error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}