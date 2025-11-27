import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '../.env.local' });

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, userType, ...userData } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateCode();
    const codeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType,
        verificationCode,
        codeExpiry,
        isVerified: false,
        ...userData,
      },
    });

    console.log(`Verification code for ${email}: ${verificationCode}`);

    res.json({ success: true, message: 'Inscription réussie' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ 
        needsVerification: true, 
        email: user.email,
        error: 'Compte non vérifié' 
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Compte déjà vérifié' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: 'Code de vérification incorrect' });
    }

    if (new Date() > user.codeExpiry) {
      return res.status(400).json({ error: 'Code expiré' });
    }

    await prisma.user.update({
      where: { email },
      data: { 
        isVerified: true,
        verificationCode: null,
        codeExpiry: null,
      },
    });

    res.json({ success: true, message: 'Compte vérifié avec succès' });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification' });
  }
});

app.post('/api/auth/resend-code', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Compte déjà vérifié' });
    }

    const verificationCode = generateCode();
    const codeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { verificationCode, codeExpiry },
    });

    console.log(`New verification code for ${email}: ${verificationCode}`);

    res.json({ success: true, message: 'Code renvoyé' });
  } catch (error) {
    console.error('Resend code error:', error);
    res.status(500).json({ error: 'Erreur lors du renvoi du code' });
  }
});

app.put('/api/user/update', async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    const user = await prisma.user.update({
      where: { email },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
