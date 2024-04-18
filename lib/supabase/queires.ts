'use server';
import { assessments, psiTest } from "@/migrations/schema";
import db from "./db";
import { subscription } from "./supabase.types";

export const getUserSupscriptionStatus = async (userId: string) => {
    try{
        const data = await db.query.subscriptions.findFirst({
            where: (s, {eq}) => eq(s.userId, userId), 
        });
        if(data) return {data: data as subscription, error: null};
        else return{data: null, error: null};
    }catch(err){
        console.log(err);
        return{data: null, error: 'Error'};
    }
};
export const createNewAssessement = async (userId: string) => {
    try{
        const data = await db.insert(assessments).values({userId: userId});
        return {data: data, error: null};
    } catch(error){
        console.log(error);
        return {data: null, error:'Error'}
    };
};
export const createPsiTest = async (assessmentId: string) => {
    try{
        const data = await db.insert(psiTest).values({assessmentId: assessmentId})
        console.log(data)
        return {data: data, error: null};
    } catch(error){
        console.log(error);
        return {data: null, error:'Error'}
    };

}
