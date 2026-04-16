import React from 'react';

interface Comentario {
    id: number;
    comentario: string;
    nome: string;
    foto_perfil: string;
}

interface ComentariosCardProps {
    comentario: Comentario;
}

const ComentariosCard: React.FC<ComentariosCardProps> = ({ comentario }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
                <img src={comentario.foto_perfil} alt={comentario.nome} className="w-10 h-10 rounded-full mr-4" />
                <h3 className="font-bold">{comentario.nome}</h3>
            </div>
            <p>{comentario.comentario}</p>
        </div>
    );
};

export default ComentariosCard;
