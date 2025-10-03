export async function sendVerificationRequest(params: any) {
  console.log('🔐 [MAGIC LINK DEBUG] Starting sendVerificationRequest')
  console.log('🔐 [MAGIC LINK DEBUG] Environment:', process.env.NODE_ENV)
  console.log('🔐 [MAGIC LINK DEBUG] Params received:', {
    identifier: params.identifier,
    provider: params.provider ? { from: params.provider.from, hasApiKey: !!params.provider.apiKey } : null,
    url: params.url,
    theme: params.theme
  })

  const { identifier: to, provider, url, theme } = params
  const { host } = new URL(url)

  console.log('🔐 [MAGIC LINK DEBUG] Parsed values:', {
    to,
    host,
    from: provider?.from,
    hasApiKey: !!provider?.apiKey
  })

  try {
    console.log('🔐 [MAGIC LINK DEBUG] Making request to Resend API...')
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: provider.from,
        to,
        subject: 'Sign in to Atomic Ambitions',
        html: html({ url, host, theme }),
        text: text({ url, host }),
      }),
    })

    console.log('🔐 [MAGIC LINK DEBUG] Resend API response status:', res.status)
    console.log('🔐 [MAGIC LINK DEBUG] Resend API response headers:', Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      const errorBody = await res.json()
      console.error('🔐 [MAGIC LINK DEBUG] Resend API error:', errorBody)
      throw new Error('Resend error: ' + JSON.stringify(errorBody))
    }

    const successBody = await res.json()
    console.log('🔐 [MAGIC LINK DEBUG] Resend API success:', successBody)
    console.log('🔐 [MAGIC LINK DEBUG] Magic link email sent successfully to:', to)

  } catch (error) {
    console.error('🔐 [MAGIC LINK DEBUG] Error in sendVerificationRequest:', error)
    console.error('🔐 [MAGIC LINK DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}

function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, '&#8203;.')

  const brandColor = theme.brandColor || '#346df1'
  const color = {
    background: '#454749',
    text: '#fefadc',
    mainBackground: '#1e293b',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fefadc',
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to Atomic Ambitions at <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Thanks for participating in Atomic Ambitions. When you click the "Sign In" button, we will bring you back to the website to verify your confirmation code. That&apos;s how we know it is really you.
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If this is the first time, we will create your free account. Then you can complete your registration. If you already have an account, clicking the button simply signs you in.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you are not trying to sign in to Atomic Ambitions, please ignore this message. We apologize for the disruption.
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 12px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Atomic Ambitions (https://atomicambitions.com) and  Zanzibar&apos;s World of Nuclear Energy (https://worldofnuclear.com) are digital properties of Nuclear Ambitions LLC (https://nuclearambitions.com).
      </td>
    </tr>
  </table>
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}