import { useState, useEffect, useCallback, useRef } from 'react';
import Notepad from './Notepad';
import TabList from './TabList';
import SaveList from './SaveList';
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

	// const [pageId, setPageId] = useState(0);
	
	useEffect(() => {
		localStorage.clear();
	}, []);

	const nextId = useRef(2)

	const onNewTab = useCallback(
		() => {
			const note = {
				id : nextId.current,
				title : "1",
				text: "1",
				selected: true
			}
			const newNotes = notes.map(note => ({...note, selected: false}))
			setNotes(newNotes.concat(note));
			nextId.current += 1;
			console.log("onNewTab!!!")
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
			// setNotes(notes.map(note => note.pageId === pageId ? {...note, text: texts} : note))
			setNotes(notes.map(note => note.selected === true ? {...note, text: texts} : note))
			console.log("onChangeText!!!")
		},
		[notes]
	)

	const onClickToTabLi = useCallback(
		id => {
			setNotes(notes.map(note => note.id === id ? { ...note, selected: true} : { ...note, selected: false}));
			// setPageId(id);
			console.log("onClickToTablLi!!!")
		},
		[notes]
	)


  return (
	<Notepad>
		<MenuList onNewTab = {onNewTab}>
		</MenuList>
		<TabList notes = {notes} onDelete = {onDelete} onChangeText = {onChangeText} onClickToTabLi = {onClickToTabLi}>
		</TabList>	
		<SaveList>
		</SaveList>
	</Notepad>

		// <div className = "container">
		// 	<div className = "menu">
		// 		<button id="saveBtn">Save</button>
		// 		<button id="loadBtn">Load</button>
		// 		<button id="saveAsBtn">SaveAs</button>
		// 		<button id="tabBtn">Tab</button>
		// 	</div>
		// 	<p></p><p></p>
		// 	<div className = "tab_li" id = "tab-li">

		// 	</div>
		// 	<div className = "tab_container" id = "tab-container">

		// 	</div>
		// 	<p></p>
		// 	<div className = "save_container">
		// 		<div className = "notselected" id = "save-container">
		// 			LOAD
		// 			<p></p>
		// 		</div>
		// 	</div>
		// </div>
  );
}

export default App;
/**
 * 탭에 관련된 모든 정보 저장하기
 * 탭 라인만 표시해두고 컨테이너부분은 가만히 두기
 * 탭 클릭시 컨테이너 안 정보를 탭스에서 불러오기
 * tabs[] <= tab[] <= title, value, targetOn
 * 
 */

