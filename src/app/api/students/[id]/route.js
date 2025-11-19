import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Buscar aluno por ID
export async function GET(request, { params }) {
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

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar aluno' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar aluno
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const student = await prisma.student.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Aluno não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar aluno' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar aluno
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Aluno deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Aluno não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao deletar aluno' },
      { status: 500 }
    );
  }
}
