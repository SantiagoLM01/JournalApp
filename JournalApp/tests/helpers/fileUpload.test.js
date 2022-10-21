import { v2 as cloudinary } from 'cloudinary'
import fileUpload from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'drddqjnem',
    api_key: '837262618556724',
    api_secret: 'QKPKkcvbrqjFXQfsz8ifUY1N6BQ',
    secure: true
}) 

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/3.png'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')
        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const id = segments[(segments.length - 1)].replace('.png', '')
        await cloudinary.api.delete_resources(['journal/' + id]);

        console.log(id)


    })

    test('debe de retornar null', async () => {


        const file = new File([], 'foto.jpg')
        const url = await fileUpload(file)

        expect(url).toBe(null)

    })


}) 