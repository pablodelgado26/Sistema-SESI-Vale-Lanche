'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const StudentsContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};

export const StudentsProvider = ({ children }) => {
  // Inicializar com dados do localStorage ou dados de exemplo
  const [students, setStudents] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem('sesi-students');
      if (savedStudents) {
        return JSON.parse(savedStudents);
      }
      // Dados de exemplo
      const exampleStudents = [
        {
          id: '1',
          name: 'João Silva',
          serie: '9º Ano A',
          photo: '',
          hasVoucherToday: true,
          qrCode: 'SESI001'
        },
        {
          id: '2',
          name: 'Maria Santos',
          serie: '8º Ano B',
          photo: '',
          hasVoucherToday: false,
          qrCode: 'SESI002'
        },
        {
          id: '3',
          name: 'Pedro Oliveira',
          serie: '7º Ano C',
          photo: '',
          hasVoucherToday: true,
          qrCode: 'SESI003'
        }
      ];
      localStorage.setItem('sesi-students', JSON.stringify(exampleStudents));
      return exampleStudents;
    }
    return [];
  });

  // Salvar no localStorage sempre que houver mudanças
  const saveStudents = (newStudents) => {
    setStudents(newStudents);
    localStorage.setItem('sesi-students', JSON.stringify(newStudents));
  };

  const findStudentByQRCode = (qrCode) => {
    return students.find(student => student.qrCode === qrCode);
  };

  const isQRCodeUnique = (qrCode) => {
    return !students.some(student => student.qrCode === qrCode);
  };

  const useVoucher = (studentId) => {
    const newStudents = students.map(student =>
      student.id === studentId
        ? { ...student, hasVoucherToday: false }
        : student
    );
    saveStudents(newStudents);
  };

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now().toString(),
      hasVoucherToday: true
    };
    saveStudents([...students, newStudent]);
  };

  const deleteStudent = (studentId) => {
    const newStudents = students.filter(student => student.id !== studentId);
    saveStudents(newStudents);
  };

  const updateStudent = (studentId, updatedData) => {
    const newStudents = students.map(student =>
      student.id === studentId
        ? { ...student, ...updatedData }
        : student
    );
    saveStudents(newStudents);
  };

  const giveVoucherToAll = () => {
    const newStudents = students.map(student => ({
      ...student,
      hasVoucherToday: true
    }));
    saveStudents(newStudents);
  };

  const removeVoucherFromAll = () => {
    const newStudents = students.map(student => ({
      ...student,
      hasVoucherToday: false
    }));
    saveStudents(newStudents);
  };

  return (
    <StudentsContext.Provider
      value={{
        students,
        findStudentByQRCode,
        isQRCodeUnique,
        useVoucher,
        addStudent,
        deleteStudent,
        updateStudent,
        giveVoucherToAll,
        removeVoucherFromAll
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};
