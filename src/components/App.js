import { useState, useEffect, useCallback, useRef } from 'react';
import Notepad from './Notepad';
import TabList from './TabList';
import MenuList from './MenuList';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id : 1,
			title : "O",
			text: "",
			selected: true,
		},
	]);

	useEffect(() => {
		localStorage.clear();
	}, []);

	const nextId = useRef(2)

	const onNewTab = useCallback(
		() => {
			const note = {
				id : nextId.current,
				title : "O",
				text: "",
				selected: true
			}
			const newNotes = notes.map(note => ({...note, selected: false}))
			setNotes(newNotes.concat(note));
			nextId.current += 1;
			console.log("onNewTab!!!")
		},
		[notes]
	)
	
	const onLoad = useCallback(
		() => {

		},
		[notes]
	)

	const onDelete = useCallback(
		id => {
			const newNotes = notes.filter(note => note.id !== id)
			let minIdNewNotes = Math.min.apply(Math, newNotes.map(note => note.id))
			setNotes(newNotes.map(note => note.id !== minIdNewNotes ? { ...note, selected: false} : { ...note, selected: true}));
			console.log("onDelete!!!")
		}, 
		[notes]
	)

	const onChangeText = useCallback(
		texts => {
			setNotes(notes.map(note => note.selected === true ? {...note, text: texts} : note))
			console.log("onChangeText!!!")
		},
		[notes]
	)

	const onClickToTabLi = useCallback(
		id => {
			setNotes(notes.map(note => note.id === id ? { ...note, selected: true} : { ...note, selected: false}));
			console.log("onClickToTablLi!!!")
		},
		[notes]
	)


  return (
	<Notepad>
		<MenuList notes = {notes} setNotes = {setNotes} onLoad = {onLoad} onNewTab = {onNewTab} >
		</MenuList>
		<TabList notes = {notes} onDelete = {onDelete} onChangeText = {onChangeText} onClickToTabLi = {onClickToTabLi}>
		</TabList>	
	</Notepad>
  );
}

export default App;

