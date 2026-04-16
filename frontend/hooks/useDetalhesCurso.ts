
import { useState, useEffect } from 'react';
import { buscarCursoPorId } from '../servicos/servico.cursos';
import { Curso } from '../tipos/curso';

export const useDetalhesCurso = (id: string | undefined) => {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCurso = async () => {
      try {
        setLoading(true);
        const response = await buscarCursoPorId(id);
        const cursoData = response?.data;
        if (cursoData && typeof cursoData === 'object') {
          setCurso(cursoData);
        } else {
          setCurso(null);
          setError(new Error('Curso não encontrado'));
        }
      } catch (err: any) {
        setError(err);
        setCurso(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  return { curso, loading, error };
};
