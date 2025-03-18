import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const Home = () => {
    const refresh = () => window.location.reload();

    return (
        <div>
            <AddBook refresh={refresh} />
            <BookList />
        </div>
    );
};

export default Home;
