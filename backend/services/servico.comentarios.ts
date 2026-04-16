import { repositorioComentarios } from '../repository/repositorio.comentarios';

export const servicoComentarios = {
    async buscarComentariosPorCurso(cursoId: number) {
        return repositorioComentarios.buscarComentariosPorCurso(cursoId);
    },

    async criarComentario(cursoId: number, usuarioId: number, comentario: string) {
        return repositorioComentarios.criarComentario(cursoId, usuarioId, comentario);
    },
};
