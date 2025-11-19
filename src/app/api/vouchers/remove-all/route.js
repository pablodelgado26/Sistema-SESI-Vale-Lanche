import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST - Remover vale de todos os alunos
export async function POST() {
  try {
    await prisma.student.updateMany({
      data: { hasVoucherToday: false },
    });

    return NextResponse.json({ message: 'Vales removidos de todos os alunos' });
  } catch (error) {
    console.error('Erro ao remover vales:', error);
    return NextResponse.json(
      { error: 'Erro ao remover vales' },
      { status: 500 }
    );
  }
}
