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

document.addEventListener('DOMContentLoaded', function() {
    // 이메일 도메인 직접 입력 기능
    const emailDomainSelect = document.getElementById('email-domain');
    const emailDomainCustom = document.getElementById('email-domain-custom');

    if (emailDomainSelect && emailDomainCustom) {
        emailDomainSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                emailDomainSelect.style.display = 'none';
                emailDomainCustom.style.display = 'block';
                emailDomainCustom.value = '';
                emailDomainCustom.focus();
            }
        });

        emailDomainCustom.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                emailDomainSelect.style.display = 'block';
                emailDomainCustom.style.display = 'none';
                emailDomainSelect.value = '';
            }
        });
    }

    // 폼 제출 처리
    const form = document.querySelector('.register-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const localPart = document.getElementById('email-local').value;
            let domainPart;
            
            if (emailDomainCustom.style.display === 'none') {
                domainPart = emailDomainSelect.value;
            } else {
                domainPart = emailDomainCustom.value;
            }
            
            const fullEmail = localPart + '@' + domainPart;
            console.log('전체 이메일:', fullEmail);
        });
    }

    // D-Day 카운트다운 기능
    function updateCountdown() {
        const deadlineElement = document.querySelector('.deadline-days');
        if (!deadlineElement) return;

        // data-deadline 속성에서 날짜 가져오기
        const deadlineDate = new Date(deadlineElement.getAttribute('data-deadline'));
        const today = new Date();
        
        // 시간을 00:00:00으로 설정하여 날짜만 비교
        today.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);
        
        // 날짜 차이 계산 (밀리초 → 일)
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // 마감일이 지났을 때
        if (diffDays < 0) {
            // 옵션 1: 전체 배지 숨기기
            document.querySelector('.deadline-badge').style.display = 'none';
            
            // 옵션 2: "마감되었습니다" 표시 (위 코드 주석처리하고 아래 사용)
            // deadlineElement.style.display = 'none';
            // document.querySelector('.deadline-text').textContent = '마감되었습니다';
            // document.querySelector('.deadline-unit').style.display = 'none';
            // document.querySelector('.deadline-icon').style.display = 'none';
        } else {
            // 0일 이상이면 정상 표시
            const daysRemaining = diffDays;
            deadlineElement.textContent = String(daysRemaining).padStart(2, '0');
            document.querySelector('.deadline-text').textContent = '마감까지';
            document.querySelector('.deadline-unit').textContent = '일 남음';
        }
    }

    // 페이지 로드시 실행
    updateCountdown();

    // 매일 자정에 업데이트
    setInterval(updateCountdown, 1000 * 60 * 60); // 1시간마다 체크
    });

    // 개인정보 수집 동의 팝업
    const privacyToggle = document.getElementById('privacy-toggle');
    const privacyPopup = document.getElementById('privacy-popup');
    const privacyClose = document.getElementById('privacy-close');

    if (privacyToggle && privacyPopup) {
        privacyToggle.addEventListener('click', function(e) {
            e.preventDefault();
            privacyPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (privacyClose) {
        privacyClose.addEventListener('click', function(e) {
            e.preventDefault(); // 이 부분 추가
            privacyPopup.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    privacyPopup.addEventListener('click', function(e) {
        if (e.target === privacyPopup) {
            privacyPopup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    
    // 마케팅 정보 수신 동의 팝업
    const marketingToggle = document.getElementById('marketing-toggle');
    const marketingPopup = document.getElementById('marketing-popup');
    const marketingClose = document.getElementById('marketing-close');

    if (marketingToggle && marketingPopup) {
        marketingToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            marketingPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (marketingClose) {
        marketingClose.addEventListener('click', function(e) {
            e.preventDefault(); // 이 부분 추가
            marketingPopup.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    marketingPopup.addEventListener('click', function(e) {
        if (e.target === marketingPopup) {
            marketingPopup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });


    // 신청 폼 팝업 열기/닫기
    const openRegisterBtn = document.getElementById('open-register-popup');
    const registerPopup = document.getElementById('register-popup');
    const closeRegisterBtn = document.getElementById('close-register-popup');

    if (openRegisterBtn && registerPopup) {
        openRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeRegisterBtn) {
            closeRegisterBtn.addEventListener('click', function() {
                registerPopup.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    }

   // 팝업 내 이메일 직접 입력
    const popupEmailDomain = document.getElementById('popup-email-domain');
    const popupEmailCustom = document.getElementById('popup-email-custom');

    if (popupEmailDomain && popupEmailCustom) {
        // 도메인 선택 변경 시
        popupEmailDomain.addEventListener('change', function() {
            if (this.value === 'custom') {
                this.style.display = 'none';
                popupEmailCustom.style.display = 'block';
                popupEmailCustom.value = '';
                popupEmailCustom.placeholder = 'example.com';
                popupEmailCustom.focus();
                popupEmailCustom.required = true;
                this.required = false;
            }
        });
        
        // 직접입력 필드에서 포커스 벗어날 때 빈 값이면 다시 선택박스로
        popupEmailCustom.addEventListener('blur', function() {
            if (!this.value.trim()) {
                popupEmailDomain.style.display = 'block';
                this.style.display = 'none';
                popupEmailDomain.value = '';
                popupEmailDomain.required = true;
                this.required = false;
            }
        });
    }


    // 팝업 내 자세히보기 링크
    const popupPrivacyLink = document.getElementById('popup-privacy-link');
    const popupMarketingLink = document.getElementById('popup-marketing-link');

    if (popupPrivacyLink) {
        popupPrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('privacy-popup').classList.add('show');
        });
    }

    if (popupMarketingLink) {
        popupMarketingLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('marketing-popup').classList.add('show');
        });
    }

    // 기존 floating bar 버튼 이벤트 리스너 아래에 추가
    const ctaRegisterBtn = document.getElementById('cta-register-button');
    if (ctaRegisterBtn && registerPopup) {
        ctaRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }