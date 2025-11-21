import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, name: string, verificationCode: string) {
    const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Vérifiez votre compte Réseau TSI',
        html: `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; }
.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
.code-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
.code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
.warning { color: #e74c3c; font-size: 14px; margin-top: 20px; }
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>🌳 Réseau TSI</h1>
<h2>Vérification de votre compte</h2>
</div>
<div class="content">
<p>Bonjour ${name},</p>
<p>Merci de vous être inscrit sur <strong>Réseau TSI</strong>!</p>
<p>Pour activer votre compte, veuillez utiliser le code de vérification ci-dessous :</p>
<div class="code-box">
<div class="code">${verificationCode}</div>
</div>
<p>Ce code est valide pendant <strong>15 minutes</strong>.</p>
<p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
<p class="warning">⚠️ Ne partagez jamais ce code avec qui que ce soit.</p>
<p>Cordialement,<br>L'équipe Réseau TSI</p>
</div>
</div>
</body>
</html>
        `,
    });
    return result;
}

export async function sendWelcomeEmail(email: string, name: string, userType: string) {
    await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Bienvenue sur Réseau TSI! 🎉',
        html: `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; }
.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
.button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
.success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>🌳 Réseau TSI</h1>
<h2>Bienvenue ${name}!</h2>
</div>
<div class="content">
<div class="success">
<strong>✅ Votre compte est maintenant vérifié!</strong>
</div>
<p>Bonjour ${name},</p>
<p>Nous sommes ravis de vous accueillir sur <strong>Réseau TSI</strong>!</p>
<p>Votre compte ${userType === 'company' ? 'Structure' : 'Intervenant'} a été créé et vérifié avec succès.</p>
<p>Vous pouvez maintenant vous connecter et commencer à utiliser notre plateforme.</p>
<a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="button">
Se connecter
</a>
<p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
<p>Cordialement,<br>L'équipe Réseau TSI</p>
</div>
</div>
</body>
</html>
        `,
    });
}
