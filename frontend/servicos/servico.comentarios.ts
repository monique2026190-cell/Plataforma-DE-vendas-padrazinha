import api from './api';

export const servicoComentarios = {
    async buscarComentariosPorCurso(cursoId: number) {
        const response = await api.get(`/cursos/${cursoId}/comentarios`);
        return response.data;
    },

    async criarComentario(cursoId: number, usuarioId: number, comentario: string) {
        const response = await api.post(`/cursos/${cursoId}/comentarios`, { usuarioId, comentario });
        return response.data;
    },
};
