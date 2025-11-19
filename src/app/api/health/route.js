import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Verificar status da conexão com o banco
export async function GET() {
  try {
    // Tenta fazer uma query simples
    await prisma.$queryRaw`SELECT 1`;
    
    // Conta quantos alunos existem
    const count = await prisma.student.count();
    
    return NextResponse.json({
      status: 'connected',
      message: 'Banco de dados conectado com sucesso!',
      studentsCount: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Erro ao conectar ao banco de dados',
      error: error.message,
      hint: 'Verifique se DATABASE_URL está configurado no .env.local',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
