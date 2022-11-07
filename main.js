const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = '5686805754:AAH7UyFNFzAoDYyHRereHrIrSy8zmgJlfC4';
const bot = new TelegramBot(token, {polling: true});


const location =   bot.on('message', async (msg)=>{
    const request = {
        lang: msg.location.latitude,
        lon: msg.location.longitude,
        type: 'eczane'
    }
   
    await getApiCall(request).then((res)=>{
      
       res.result.forEach((item)=>{
        const index = item.loc.search(',');
        const lat = +item.loc.slice(0,index);
        const lon = +item.loc.slice(index+1);
        console.log(lat,lon,msg.chat.id);
        bot.sendLocation(msg.chat.id,lat,lon);
        bot.sendMessage(msg.chat.id,`${item.title}`)
        bot.sendMessage(msg.chat.id,`${item.dist}`)
        bot.sendMessage(msg.chat.id,`${item.phone}`)})
    })
})



const getApiCall  = async (request) =>{
    
    const API_KEY = 'apikey 0FcuBZPK7LgyAJT7sbUpW5:4gqKELQ5kd3h6krRvFikrR';
   const response = await axios.get('https://api.collectapi.com/health/dutyPharmacy?il=Eskişehir',{
        headers: {
            'authorization': API_KEY,
            'content-type': 'application/json',
        },
        
    },
    {request}
    )
    return response.data
}
