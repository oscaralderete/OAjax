<?php
/*
@author: Oscar Alderete <me@oscaralderete.com>
@website: https://oscaralderete.com
@editor: NetBeans IDE v12.5
*/

namespace OscarAlderete;

class Main {

	private $path;
	private $search;
	private $replace;
	private $output = [
		'result' => 'ERROR',
		'message' => 'Error code 3001.'
	];
	private $templateLI = '
<li style="background-color:$color">
	<span>$i</span>
</li>
	';
	private $lang = 'en';

	const VERSION = '1.0.0';

	function __construct(string $path) {
		$this->path = $path . '/';
	}

	// publics
	public function interceptPostRequests() {
		if(!empty($_POST) && isset($_POST['action'])) {
			// the default output
			$s = $this->output;
			// switch
			switch($_POST['action']) {
				case 'test':
					$s = [
						'result' => 'OK',
						'message' => 'Hi ' . $_POST['data']['name'] . ' ' . $_POST['data']['surname'] . ', it works!',
						'date_time' => date('Y-m-d H:i:s:')
					];
					break;
				case 'translateIntroText':
					$s = $this->translateIntroText($_POST['data']);
					break;
				case 'reloadTiles':
					$s = $this->reloadTiles($_POST['data']);
					break;
				default:
					// undefined method
					$s['message'] = 'Undefined method.';
			}
			$this->json($s);
		}
	}

	public function renderPage() {
		// set the view variables
		$this->setViewVars();

		// echo the view
		$this->echoTheView();
	}

	// privates
	private function json(array $s) {
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($s, true);
		die;
	}
	
	private function setViewVars() {
		$this->search = [
			'$version',
			'$site_url',
			'$LIs',
			'$intro_text',
			'$pageData'
		];
		$this->replace = [
			'?v=' . self::VERSION,
			$_SERVER['PHP_SELF'],
			$this->getLIs(),
			$this->getIntroText(),
			$this->getPageData()
		];
	}

	private function getPageData() {
		$s = [
			'url' => $_SERVER['PHP_SELF'],
			'token' => bin2hex('random**' . time())
		];
		return json_encode($s);
	}

	private function echoTheView() {
		echo str_replace($this->search, $this->replace, file_get_contents($this->path . 'view/index.html'));
	}

	private function getLIs(int $tiles = 6) {
		$s = '';
		for($i = 0; $i < $tiles; $i++){
			$s .= str_replace(['$color', '$i'], [$this->getColor($i), ($i + 1)], $this->templateLI);
		}
		return $s;
	}

	private function getColor(int $i) {
		if($i > 255){
			$i = 0;
		}
		return sprintf('#%06X', mt_rand($i, 0xffffff));
	}

	private function getIntroText() {
		return file_get_contents($this->path . 'view/text-' . $this->lang . '.html');
	}

	private function translateIntroText(array $post) {
		$s = $this->output;

		try{
			$this->lang = $post['lang'];
			$s['result'] = $s['message'] = 'OK';
			$s['html'] = $this->getIntroText();
		}
		catch (Exception $ex) {
			$s['message'] = $ex->getMessage();
		}

		return $s;
	}

	private function reloadTiles(array $post) {
		$s = $this->output;

		try{
			$s['result'] = $s['message'] = 'OK';
			$s['html'] = $this->getLIs((int) $post['tiles']);
		}
		catch (Exception $ex) {
			$s['message'] = $ex->getMessage();
		}

		return $s;
	}
}
