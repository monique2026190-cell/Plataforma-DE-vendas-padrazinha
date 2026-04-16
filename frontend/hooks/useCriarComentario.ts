import { useMutation, useQueryClient } from 'react-query';
import { servicoComentarios } from '../servicos/servico.comentarios';

export const useCriarComentario = (cursoId: number) => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ comentario, usuarioId }: { comentario: string; usuarioId: number }) =>
            servicoComentarios.criarComentario(cursoId, usuarioId, comentario),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comentarios', cursoId]);
            },
        }
    );
};
