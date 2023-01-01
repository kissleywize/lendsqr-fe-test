import '../../styles/users/users.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UsersStats from '../../components/users/UsersStats';
import UsersTable from '../../components/users/UsersTable';
import ReactPaginate from 'react-paginate';

const Users = () => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = users.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(users.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % users.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};

	const fetchUsers = async () => {
		setLoading(true);
		await axios
			.get('https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users')
			.then((response) => {
				console.log(response.data, 'data');
				setUsers(response.data);
				setLoading(false);
			})
			.catch((error) => {
				const err = error.response.data;
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<section className="users">
			<h1>Users</h1>
			<div>
				<UsersStats />
				<UsersTable users={currentItems} />
				<div className="users-paginate">
          <div className='user-page-info'>
            <p>Showing {itemOffset + 10} out of {users.length}</p>
          </div>
					<ReactPaginate
						nextLabel=">"
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={pageCount}
						previousLabel="<"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="arrow"
						nextClassName="arrow"
						breakLabel="..."
						containerClassName="pagination"
						activeClassName="active"
						// renderOnZeroPageCount={null}
					/>
				</div>
			</div>
		</section>
	);
};

export default Users;
