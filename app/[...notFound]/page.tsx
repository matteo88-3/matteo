import React from 'react'
import Hero from '@/components/404';
export async function generateMetadata() {
    return {
      title: 'Elohim Group',
  description: 'Global Solutions. Local Impact. Purpose-Driven Growth.',
    };
  }
  

function NotFound() {
  return (
	<>
	
   <Hero />

	</>
   
    )
    }
    export default  NotFound;
