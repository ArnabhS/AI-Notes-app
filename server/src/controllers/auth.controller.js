import supabase from "../config/db.js"

export const signup = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    }
     catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal server error"});
    }
}
export const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal server error"});
    }
}

export const googleLogin = async (req,res)=>{
   try {
     const { id_token } = req.body;
     const { data, error } = await supabase.auth.signInWithIdToken({
         provider: 'google',
         token: id_token,
     });
     if (error) return res.status(400).json({ error: error.message });
     return res.status(200).json(data);
   } catch (error) {
     console.log(error.message)
     return res.status(501).json({message:"Internal server error"})
   }
}


