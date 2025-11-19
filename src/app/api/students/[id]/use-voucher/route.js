import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST - Usar vale do aluno
export async function POST(request, { params }) {
  try {
    const { id } = params;

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Aluno não encontrado' },
        { status: 404 }
      );
    }

    if (!student.hasVoucherToday) {
      return NextResponse.json(
        { error: 'Aluno já utilizou o vale hoje' },
        { status: 400 }
      );
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { hasVoucherToday: false },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Erro ao usar vale:', error);
    return NextResponse.json(
      { error: 'Erro ao usar vale' },
      { status: 500 }
    );
  }
}
