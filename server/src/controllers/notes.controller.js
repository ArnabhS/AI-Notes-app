import supabase from "../config/db.js";

export const createNote = async (req,res)=>{
    try {
        const { user_id, content } = req.body;
        const { data, error } = await supabase.from('notes').insert([{ user_id, content }]);
        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(501).json({message:"Internal server error"})
    }
}

export const getNotes = async(req,res)=>{
    try {
        const { user_id } = req.params;
        const { data, error } = await supabase.from('notes').select('*').eq('user_id', user_id);
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal server error"})
    }
}

export const deleteNote = async (req,res)=>{
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('notes').delete().eq('id', id);
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    }
     catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal server error"});
    }
}