import { ListOfPersons } from './ListOfPersons'
import TwitterFollorCard from './TwitterFollowCard'
function App() {
    return (
        <div className='App'>
            <TwitterFollorCard userName="mellambias" name="Miguel E. Llambías" isFollowing={false} />
            <TwitterFollorCard userName="midudev" name="Miguel Angel duran" isFollowing={false} />
            <TwitterFollorCard userName="mellambias" name="Miguel E. Llambías" isFollowing />
            <ListOfPersons />
        </div>


    )
}

export default App