import { useState, useEffect } from 'react';
import '../style/App.css';
import '../style/style.css'
import '../style/tabStyle.css'

function App() {
	const [init, setInit] = useState(false);
	useEffect(() => {
		//탭초기화
		localStorage.clear();
		setInit(true)
	}, []);

  return (
	<>
	{init ? (
		<div className = "container">
			<div className = "menu">
				<button id="saveBtn">Save</button>
				<button id="loadBtn">Load</button>
				<button id="saveAsBtn">SaveAs</button>
				<button id="tabBtn">Tab</button>
			</div>
			<p></p><p></p>
			<div className = "tab_li" id = "tab-li">

			</div>
			<div className = "tab_container" id = "tab-container">

			</div>
			<p></p>
			<div className = "save_container">
				<div className = "notselected" id = "save-container">
					LOAD
					<p></p>
				</div>
			</div>
		</div>
		) : (
			"Initializing..."
		)}
	</>
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

