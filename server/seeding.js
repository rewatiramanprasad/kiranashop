import {dummyData} from '@/dummyData.mjs'
export const seeding = async () => {
    for (let i = 0; i < dummyData.length; i++) {
        const item = {name: dummyData[i].full_name, mobile: dummyData[i].mobile, amount: dummyData[i].amount, remarks: dummyData[i].remarks}
        console.log(item)
        try {
            const res = await fetch('http://localhost:3000/api/addCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error('Error seeding data:', error)
        }
    }
} 