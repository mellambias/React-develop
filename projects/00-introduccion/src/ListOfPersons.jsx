/* eslint-disable react/prop-types */

export function Card({ name, age }) {
    return (
        <div style={{ color: "white" }}>
            Nombre: <strong>{name}</strong> Edad <span>{age}</span>
        </div >
    )
}



// Definimos un componente
export function ListOfPersons() {
    // Definimos un Array de personas
    const personas = [
        {
            name: "Juan",
            age: 21
        },
        {
            name: "Pedro",
            age: 26
        },
        {
            name: "Antonio",
            age: 18
        }
    ]

    return (
        <ul>
            {

                personas.map(({ name, age }) => {
                    return (
                        <li key={name}> <Card name={name} age={age} /> </li>
                    )
                })
            }
        </ul>
    )
}