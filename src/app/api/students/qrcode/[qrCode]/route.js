import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Buscar aluno por QR Code
export async function GET(request, { params }) {
  try {
    const { qrCode } = params;
    
    const student = await prisma.student.findUnique({
      where: { qrCode: decodeURIComponent(qrCode) },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Aluno não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erro ao buscar aluno por QR Code:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar aluno' },
      { status: 500 }
    );
  }
}
