import { useEffect, useState } from 'react'



export default function ServiceAppointmentList() {

    const [serviceAppointments, setServiceAppointments] = useState([])
    const fetchServiceAppointments = async () => {
        const url = 'http://localhost:8080/api/service-appointments/'
        const res = await fetch(url)
        const serviceAppointmentsDict = await res.json()
        console.log(serviceAppointmentsDict)
        setServiceAppointments(serviceAppointmentsDict.service_appointments)
    }

    const [automobileVOs, setAutomobileVOs] = useState([]);
    const fetchAutomobileVOs = async () => {
        const url = 'http://localhost:8080/api/automobilevo/'
        const res = await fetch(url)
        const automobileVODict = await res.json()
        setAutomobileVOs(automobileVODict.autos)
    }

    useEffect(() => {
        fetchServiceAppointments();
        fetchAutomobileVOs();
    }, []);

    const handleCancel = async (id) => {
        const res = await fetch(
          `http://localhost:8080/api/service-appointments/${id}`,
          {
            method: 'DELETE'
          },
        )
        if (res.ok) {
            setServiceAppointments(
                serviceAppointments.filter((appointment) => {
                    return appointment.id !== id
                })
            )
        };
    };

    const appointmentFilter= (appointment) => {
        return appointment.finished === false;
    }

    const handleFinish = async(service) => {
        const data = {...service}
        data.finished = true
        data.technician = 
        console.log(data);
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const id = service.id
        console.log(id)
        const serviceAppointmentUrl = `http://localhost:8080/api/service-appointments/${id}/`
        const res = fetch(serviceAppointmentUrl, fetchConfig)
        if (res.ok) {
            setServiceAppointments(
                serviceAppointments.filter((appointment) => {
                    return appointment.id !== id
                })
            )
        };
    };

    // if the vin matches a vin from the automobile inventory, highlight the row
    const conditionalRowStyle = (vin) => {
        if (automobileVOs.find((obj) => obj.VIN === vin ))
        {
            return {
                backgroundColor: "LemonChiffon",
            }
        }
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Owner</th>
                    <th>Date of Appointment</th>
                    <th>Time of Appointment</th>
                    <th>Technician</th>
                </tr>
            </thead>
            <tbody>
                {serviceAppointments.filter(appointmentFilter).map(appointment => {
                    return (
                        <tr key={appointment.id} style={ conditionalRowStyle(appointment.VIN) }>
                            <td>{ appointment.VIN }</td>
                            <td>{ appointment.owner }</td>
                            <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                            <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
                            <td>{ appointment.technician.name }</td>
                            <td><button onClick={ () => handleCancel(appointment.id)}>Cancel?</button></td>
                            <td><button onClick={ () => handleFinish(appointment)}>Finished?</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
