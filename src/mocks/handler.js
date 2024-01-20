const baseURL =  "https://drf-api-rec.herokuapp.com"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`,(req,res,ctx)=>{
        return res(ctx.json({
            pk: 2,
            username: "brian",
            email:"",
            first_name: "",
            last_name:"",
            profile_id:2,
            profile_image:"https://res/cloudinary.com/dgjrrvdbl/image/upload/v1"
        } ))
    })
]
