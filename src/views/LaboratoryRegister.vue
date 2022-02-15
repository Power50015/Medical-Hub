<template>
  <section class="hero is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <form action="" class="box">
              <p class="label has-text-centered is-size-5">تسجيل حساب جديد كمعمل تحاليل</p>
              <p class="has-text-centered is-size-6 has-text-danger"></p>
              <br />
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="أسم المستخدم"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="البريد الإلكترونى"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="كلمه المرور"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <a class="button is-primary is-fullwidth">تسجيل جديد</a>
              </div>
              <br/>
            <p class="has-text-centered">                            
            <router-link class="label has-text-link" to="doctor-login">
                لدى حساب بالفعل
              </router-link >
            </p> 
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
