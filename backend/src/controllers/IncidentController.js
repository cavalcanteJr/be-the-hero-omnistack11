const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query
        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.email', '=', 'incidents.ong_email')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email',
                'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents)
    },

    async create(request, response){
        const {title, description, value} = request.body
        const ong_email = request.headers.email

        const [id] = await connection('incidents').insert({
            title, description, value, ong_email
        })
        return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params
        const ong_email = request.headers.email

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_email')
        .first()

        if (incident.ong_email !== ong_email) {
            return response.status(401).json({error: 'Operatiuon not permitted'})
        }
        await connection("incidents").where('id', id).delete()

        return response.status(204).send()
    }
}