alert("おはよう、朝だ");
for (;;) {
	const n = prompt("どこへいこう？\n1. 山\n2. 川\n3. 帰る");
	if (n == 1) {
		alert("山についた");
		alert("HPが10、回復した");
	} else if (n == 2) {
		alert("川についた");
		alert("MPが5、回復した");
	} else {
		break;
	}
}
alert("もう、夜だ、おやすみ");
