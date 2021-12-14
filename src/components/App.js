import { useState, useEffect, useCallback } from 'react';
import Notepad from './Notepad';
import TabList from './TabList';
import SaveList from './SaveList';
import MenuList from './MenuList';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id : 1,
			title : "가",
			text: "aaaaa",
			selected: true,
		},
		{
			id : 2,
			title : "나",
			text: "bbbbb",
			selected: false,
		},
		{
			id : 3,
			title : "다",
			text: "ccccc",
			selected: false,
		},
	]);
	
	useEffect(() => {
	}, []);

	const onDelete = useCallback(
		id => {
			const newNotes = notes.filter(note => note.id !== id)
			let minIdNewNotes = Math.min.apply(Math, newNotes.map(note => note.id))
			setNotes(newNotes.map(note => note.id !== minIdNewNotes ? { ...note, selected: false} : { ...note, selected: true}));
		}, 
		[notes]
	)

	const onClickToTabLi = useCallback(
		id => {
			setNotes(notes.map(note => note.id === id ? { ...note, selected: true} : { ...note, selected: false}));
		},
		[notes]
	)


  return (
	<Notepad>
		<MenuList>
		</MenuList>
		<TabList notes = {notes} onDelete = {onDelete} onClickToTabLi = {onClickToTabLi}>
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

