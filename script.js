// FAQ 아코디언
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            item.classList.toggle('active');
        });
    });

    // 폼 제출
    document.querySelector('.register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('신청이 완료되었습니다!');
    });

    // 타임라인 순차 활성화 애니메이션
    const timelineItems = document.querySelectorAll('.program-timeline li');
    let currentIndex = 0;
    let timelineInterval = null;

    function activateNextTimeline() {
        // 모든 항목 비활성화
        timelineItems.forEach(item => item.classList.remove('active'));
        
        // 현재 항목 활성화
        if (timelineItems[currentIndex]) {
            timelineItems[currentIndex].classList.add('active');
        }
        
        // 다음 인덱스로 이동
        currentIndex++;
        
        // 마지막까지 가면 다시 처음으로
        if (currentIndex >= timelineItems.length) {
            currentIndex = 0;
        }
    }

    function startTimelineAnimation() {
        // 기존 인터벌이 있으면 제거
        if (timelineInterval) {
            clearInterval(timelineInterval);
        }
        
        // 첫 번째 항목 즉시 표시
        currentIndex = 0;
        activateNextTimeline();
        
        // 1.5초마다 반복
        timelineInterval = setInterval(activateNextTimeline, 1500);
    }

    // ✅ 페이지 로드 후 애니메이션 시작
    window.addEventListener('load', function() {
        setTimeout(startTimelineAnimation, 500);
    });

    // ✅ 이메일 직접입력 체크박스 기능
    document.addEventListener('DOMContentLoaded', function() {
        const checkbox = document.getElementById('direct-input-check');
        const selectBox = document.getElementById('email-domain-select');
        const inputBox = document.getElementById('email-domain-input');
        
        if (checkbox && selectBox && inputBox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // 체크박스 선택 시
                    selectBox.style.display = 'none';
                    selectBox.disabled = true;
                    inputBox.style.display = 'inline-block';
                    inputBox.disabled = false;
                    inputBox.focus();
                    selectBox.removeAttribute('required');
                    inputBox.setAttribute('required', '');
                } else {
                    // 체크박스 해제 시
                    selectBox.style.display = 'inline-block';
                    selectBox.disabled = false;
                    inputBox.style.display = 'none';
                    inputBox.disabled = true;
                    inputBox.value = '';
                    inputBox.removeAttribute('required');
                    selectBox.setAttribute('required', '');
                }
            });
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
    const emailDomainSelect = document.getElementById('email-domain');
    const emailDomainCustom = document.getElementById('email-domain-custom');

    // 도메인 선택 변경 이벤트
    emailDomainSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            // "직접 입력" 선택 시
            emailDomainSelect.style.display = 'none';
            emailDomainCustom.style.display = 'block';
            emailDomainCustom.value = '';
            emailDomainCustom.focus();
        }
    });

    // 직접 입력 필드에서 포커스가 벗어났을 때
    // 값이 비어있으면 다시 선택 박스로 전환 (선택사항)
    emailDomainCustom.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            emailDomainSelect.style.display = 'block';
            emailDomainCustom.style.display = 'none';
            emailDomainSelect.value = '';
        }
    });

    // 폼 제출 시 전체 이메일 조합
    const form = document.querySelector('.register-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const localPart = document.getElementById('email-local').value;
            let domainPart;
            
            // 현재 표시된 필드에서 도메인 가져오기
            if (emailDomainCustom.style.display === 'none') {
                domainPart = emailDomainSelect.value;
            } else {
                domainPart = emailDomainCustom.value;
            }
            
            const fullEmail = localPart + '@' + domainPart;
            console.log('전체 이메일:', fullEmail);
            
            // 실제 제출 로직 추가
            // e.preventDefault(); // 테스트 시 주석 해제
        });
    }
});