"use server"
import { db } from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const fetchAccountDetail = async () => {
    
    try {
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("No Session");
        if(session){      
        const user_name = await db.usersAccount.findFirst({
            where: { userIdno: session?.user?.id },
         
          });
          if (!user_name) return { error: "No user detected" }
          if (user_name) return { success: user_name }
        }
    }
        catch(error:any) {
            return { error: error }
        }
     
    }
export const fetchService= async () => {
  try {
        const status = "online";
             
         const Services = await db.attraction.findMany({
            where: { status:status },
         
          });
          if (!Services) return { error: "Service empty" }
          if (Services) return { success: Services }
        }
    
        catch(error:any) {
            return { error: error }
        }
     
    }
    
export const fetchCourses =  async () =>{
    try{
        const status = 'online';
         const courses = await db.course.findMany({
            where : {
                status: status
            },
         })
         if (!courses) return { error: "Courses Empty" }
         if(courses) return { success: courses}

    } catch(error : any) {
        return { error : error}

    }
}

export const fetchUpcoming =  async () =>{
    try{
        const currentDate = new Date().toISOString().split('T')[0];
         const upcomingevent = await db.event.findMany({
            where: {
                eve_start: {
                  gt: currentDate
                }
              },
         })
         if (!upcomingevent) return { error: "No upcoming event" }
         if(upcomingevent) return { success: upcomingevent}

    } catch(error : any) {
        return { error : error}

    }
}
export const fetchEvents =  async () =>{
    try{
      
         const event = await db.event.findMany({where:{
            status:'active'
        }});
         if (!event) return { error: "No Event listed" }
         if(event) return { success: event}

    } catch(error : any) {
        return { error : error}

    }
}
export const fetchCommunity  = async () => {
    try {
        const community = await db.community.findMany({where:{
            status:'active'
        }});
        if (!community) return { error: "No Event listed" }
        if(community) return { success: community}
    } catch (error : any) {
        return { error : error}

    }
}
export const fetchStaff  = async () => {
    try {
        const staff = await db.staff.findMany({
            where:{
                status:'active'
            }
        });
        if (!staff) return { error: "No Event listed" }
        if(staff) return { success: staff}
    } catch (error : any) {
        return { error : error}

    }
}
export const fetchTestemony  = async () => {
    try {
        const testimonials = await db.testimonials.findMany({
            where : {
                status:'active'
            }
        });
        if (!testimonials) return { error: "No Event listed" }
        if(testimonials) return { success: testimonials}
    } catch (error : any) {
        return { error : error}

    }
}