import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST - Dar vale para todos os alunos
export async function POST() {
  try {
    await prisma.student.updateMany({
      data: { hasVoucherToday: true },
    });

    return NextResponse.json({ message: 'Vales dados para todos os alunos' });
  } catch (error) {
    console.error('Erro ao dar vales:', error);
    return NextResponse.json(
      { error: 'Erro ao dar vales' },
      { status: 500 }
    );
  }
}
