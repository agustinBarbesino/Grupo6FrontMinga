import { useEffect, useState } from "react";
import { reactionsCreate } from "../store/actions/reactionsCreateActions";
import { reactionsAll } from "../store/actions/reactionsAllActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Components/Favourites/Cards";
import { category, search } from "../store/mangaSlice";
import { LoadingMangas } from "../Components/Mangas/LoadingMangas";

import '../Components/Mangas/mangaPages.css';

function Favourites(){
    const {categories} = useSelector(state => state.categories);
    const {categoryM} = useSelector(state => state.mangasFilterStore);
    const {reactions} = useSelector(state => state.reactions);
    const {searchM} = useSelector(state => state.mangasFilterStore);
    const [mangasReact, setMangasReact] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const updatedMangasReact = reactions
            .filter((r) => r.reaction !== "dislike" && r.reaction !== null)
            .map((r) => ({
                ...r.manga_id,
                reactId: r._id, 
            }));
        setMangasReact(updatedMangasReact); 
    }, [reactions]);

    function eliminateFav(manga_id, authorSign) {
        const dataCreate = {
            manga_id,
            author_id: authorSign?.author_id || null,
            company_id: authorSign?.company_id || null,
            reaction: null,
        };

        dispatch(reactionsCreate({ dataCreate }));
        setMangasReact(prevState => prevState.filter(manga => manga._id !== manga_id));
        
    }

    function PlaceCards({ mangas, text }) {
        let data = mangas?.filter((c) => {
            let value1 = text.toLowerCase();
            let filt1 = c.title?.toLowerCase();
            return filt1?.startsWith(value1);
        });

        if (data?.length !== 0) {
            return (
                <>
                    {data?.map((m) => (
                        <Card 
                            key={m._id} 
                            category={m.category_id.name} 
                            name={m.title} 
                            image={m.cover_photo} 
                            id={m._id} 
                            autor={m.author_id?.name || m.company_id?.name} 
                            autorId={m?.author_id} 
                            companyId={m?.company_id} 
                            description={m.description} 
                            reactId={m.reactId} 
                            handleElim={eliminateFav} />
                    ))}
                </>
            );
        } else {
            return (
                <p className="text-[#F472B6] text-center w-full text-[1.3rem] font-montserrat font-bold">
                    You don't have any manga added to favorites
                </p>
            );
        }
    }

    useEffect(() => {
        dispatch(reactionsAll());
    }, [dispatch]);

    return (
        <div className="bodyManga flex-wrap flex justify-center font-sans text-white">
            <img className="absolute imageGirl object-cover w-full filter brightness-50" 
                src="https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyxAb8N79rL9NSkepNcxqeXuYtfih-IS1wST3CCQu7z~hYQmYxziuJ~7Cp1IVxXsHUlUIuBk9RfDZ-OlKLupLMgv5nW7Mln34gFAiytq4ldsghnB7vx5iyx2N1xhrdHw9DoFkRlqeui8ABraxf16c1SjbmAHQsT4CX6UGiDG20GUu6vFhmQRMBybWiDoQvWwSOjMST~DbKuKHCUOm2WGgN5Wud6OVd3P1HUcHHlDsRmZBJIpctgH8yjd9l3ADiSiUjAqheUsoba8vJchCqGByl-1esHW8Serp6dY2G-uj2fuOHv3hYvFcBoKawzkR-fLbFjM4bdpn5vDkZGHHkn-Eg__" 
                alt="" />
                
            <div className="containerSearch flex flex-row flex-wrap justify-center content-center items-end">
                <h1 className="titleMangas font-montserrat font-bold text-center pb-16 w-full">Favourite</h1>
                <div className="searchBar w-full flex">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <circle className="stroke" cx="16.9582" cy="16.9584" r="10.7917" stroke="#999999" stroke-width="2"/>
                            <path className="stroke" d="M30.8335 30.8333L26.2085 26.2083" stroke="#999999" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <input type="text" className="w-full font-roboto font-normal outline-none placeholder:font-normal" 
                        placeholder="Find your manga here" 
                        value={searchM} 
                        onChange={(e) => dispatch(search({ searchM: e.target.value }))} />
                </div>
            </div>
            <div className="mangas w-11/12 flex justify-around flex-wrap mt-8 max-w-[1400px] gap-10">
                <PlaceCards mangas={mangasReact} text={searchM} />
            </div>
        </div>
    );
}

export default Favourites;
