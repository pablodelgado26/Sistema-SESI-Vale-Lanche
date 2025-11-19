import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Listar todos os alunos
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(students);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar alunos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo aluno
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, serie, qrCode, photo } = body;

    // Validações
    if (!name || !serie || !qrCode) {
      return NextResponse.json(
        { error: 'Nome, série e QR Code são obrigatórios' },
        { status: 400 }
      );
    }

    // Verifica se QR Code já existe
    const existingStudent = await prisma.student.findUnique({
      where: { qrCode },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'QR Code já cadastrado' },
        { status: 409 }
      );
    }

    // Cria o aluno
    const student = await prisma.student.create({
      data: {
        name,
        serie,
        qrCode,
        photo: photo || null,
        hasVoucherToday: true,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    return NextResponse.json(
      { error: 'Erro ao criar aluno' },
      { status: 500 }
    );
  }
}
