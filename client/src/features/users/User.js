import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const User = ({ userId }) => {
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'left',
            fontWeight: 'bold',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        row: {
            backgroundColor: '#fff',
        },
        rowAlt: {
            backgroundColor: '#f1f1f1',
        },
    };

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>

                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.gender}</td>
                <td style={styles.td}>{user.address}</td>
                <td style={styles.td}>{user.birthday}</td>
                <td style={styles.td}>{user.identifyNumber}</td>
                <td style={styles.td}>{user.phoneNumber}</td>

                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>


        )

    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser